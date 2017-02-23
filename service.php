<?php

if (!isset($_GET['action'])) {
    return;
}

$action = $_GET['action'];

require_once 'actions.php';

echo json_encode($action()); exit;