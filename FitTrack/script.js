
// FitTrack - Main JavaScript

// แสดง / ซ่อน รหัสผ่าน
document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const passwordInput = document.getElementById(targetId);

        if (!passwordInput) return;

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "ซ่อน";
        } else {
            passwordInput.type = "password";
            button.textContent = "แสดง";
        }
    });
});


// ระบบสมัครสมาชิก
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullname = document.getElementById("fullname");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        const fullnameError = document.getElementById("fullnameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        // ตรวจสอบว่ามีช่องกรอกข้อมูลครบหรือไม่
        if (!fullname || !email || !password || !confirmPassword) {
            alert("ไม่พบช่องกรอกข้อมูล กรุณาตรวจสอบหน้า register.html");
            return;
        }

        // ล้างข้อความแจ้งเตือน
        if (fullnameError) fullnameError.textContent = "";
        if (emailError) emailError.textContent = "";
        if (passwordError) passwordError.textContent = "";
        if (confirmPasswordError) confirmPasswordError.textContent = "";

        let isValid = true;

        if (fullname.value.trim() === "") {
            if (fullnameError) fullnameError.textContent = "กรุณากรอกชื่อ-นามสกุล";
            isValid = false;
        }

        if (email.value.trim() === "") {
            if (emailError) emailError.textContent = "กรุณากรอกอีเมล";
            isValid = false;
        } else if (!email.checkValidity()) {
            if (emailError) emailError.textContent = "รูปแบบอีเมลไม่ถูกต้อง";
            isValid = false;
        }

        if (password.value.length < 6) {
            if (passwordError) passwordError.textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
            isValid = false;
        }

        if (confirmPassword.value === "") {
            if (confirmPasswordError) confirmPasswordError.textContent = "กรุณายืนยันรหัสผ่าน";
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            if (confirmPasswordError) confirmPasswordError.textContent = "รหัสผ่านไม่ตรงกัน";
            isValid = false;
        }

        if (isValid) {
            alert("ตรวจสอบข้อมูลเรียบร้อยแล้ว");
            window.location.href = "index.html";
        }
    });
}
