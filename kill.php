<?php
session_start();
session_destroy();
echo "<script>localStorage.clear()</script>";
echo "<script>window.location = 'main.php'</script>";
?>
