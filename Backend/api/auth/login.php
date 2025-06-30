<?php
require_once '../../config/database.php';
require_once '../../utils/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    Helpers::sendError('Method not allowed', 405);
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    Helpers::sendError('Invalid JSON input');
}

// Validate required fields
$required_fields = ['email', 'password'];
$missing_fields = Helpers::validateRequired($input, $required_fields);

if (!empty($missing_fields)) {
    Helpers::sendError('Missing required fields: ' . implode(', ', $missing_fields));
}

// Sanitize input
$email = Helpers::sanitize($input['email']);
$password = $input['password']; // Don't sanitize password

// Validate email
if (!Helpers::validateEmail($email)) {
    Helpers::sendError('Invalid email format');
}

// Database connection
$database = new Database();
$db = $database->getConnection();

if (!$db) {
    Helpers::sendError('Database connection failed', 500);
}

try {
    // Check if user exists
    $query = "SELECT user_id, name, email, password_hash, role, disable_status 
              FROM registered_users WHERE email = :email";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    $user = $stmt->fetch();
    
    if (!$user) {
        Helpers::sendError('Invalid email or password');
    }
    
    // Check if account is disabled
    if ($user['disable_status'] !== 'active') {
        Helpers::sendError('Account is disabled');
    }
    
    // Verify password (check both hashed and plain text for compatibility)
    $password_valid = false;
    
    // First try plain text comparison (for existing sample data)
    if ($user['password_hash'] === $password) {
        $password_valid = true;
    }
    // Then try hashed password verification (for new registrations)
    elseif (Helpers::verifyPassword($password, $user['password_hash'])) {
        $password_valid = true;
    }
    
    if (!$password_valid) {
        Helpers::sendError('Invalid email or password');
    }
    
    // Generate token
    $token = Helpers::generateToken($user['user_id'], $user['role']);
    
    // Get additional profile data based on role
    $profile = null;
    
    if ($user['role'] === 'customer') {
        $query = "SELECT c.customer_id, ru.name, ru.email, ru.contact_number, ru.address 
                  FROM customers c 
                  JOIN registered_users ru ON c.customer_id = ru.user_id 
                  WHERE ru.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user['user_id']);
        $stmt->execute();
        $profile = $stmt->fetch();
        
    } elseif ($user['role'] === 'company') {
        $query = "SELECT c.company_id, c.company_reg_number, ru.name, ru.email, ru.contact_number, ru.address 
                  FROM companies c 
                  JOIN registered_users ru ON c.company_id = ru.user_id 
                  WHERE ru.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user['user_id']);
        $stmt->execute();
        $profile = $stmt->fetch();
        
    } elseif ($user['role'] === 'admin') {
        $query = "SELECT a.admin_id, ru.name, ru.email, ru.contact_number, ru.address 
                  FROM admins a 
                  JOIN registered_users ru ON a.admin_id = ru.user_id 
                  WHERE ru.user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user['user_id']);
        $stmt->execute();
        $profile = $stmt->fetch();
    }
    
    // Remove password from response
    unset($user['password_hash']);
    
    $response_data = [
        'user' => $user,
        'profile' => $profile,
        'token' => $token
    ];
    
    Helpers::sendResponse($response_data, 200, 'Login successful');
    
} catch (Exception $e) {
    Helpers::sendError('Login failed: ' . $e->getMessage(), 500);
}
?> 