
// แสดง / ซ่อน รหัสผ่าน
const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
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


// ระบบตรวจสอบข้อมูลสมัครสมาชิก
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // รับค่าจากช่องกรอกข้อมูล
        const fullname = document.getElementById("fullname");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        // รับตำแหน่งแสดงข้อความแจ้งเตือน
        const fullnameError = document.getElementById("fullnameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById("confirmPasswordError");

        // ล้างข้อความแจ้งเตือนเดิม
        fullnameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";

        let isValid = true;

        // ตรวจสอบชื่อ
        if (fullname.value.trim() === "") {
            fullnameError.textContent = "กรุณากรอกชื่อ-นามสกุล";
            isValid = false;
        }

        // ตรวจสอบอีเมล
        if (email.value.trim() === "") {
            emailError.textContent = "กรุณากรอกอีเมล";
            isValid = false;
        } else if (!email.checkValidity()) {
            emailError.textContent = "รูปแบบอีเมลไม่ถูกต้อง";
            isValid = false;
        }

        // ตรวจสอบรหัสผ่าน
        if (password.value.length < 6) {
            passwordError.textContent = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
            isValid = false;
        }

        // ตรวจสอบการยืนยันรหัสผ่าน
        if (confirmPassword.value === "") {
            confirmPasswordError.textContent = "กรุณายืนยันรหัสผ่าน";
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "รหัสผ่านไม่ตรงกัน";
            isValid = false;
        }

        // หากข้อมูลถูกต้อง
        if (isValid) {
            alert("ตรวจสอบข้อมูลเรียบร้อยแล้ว");

            // กลับไปยังหน้าเข้าสู่ระบบ
            window.location.href = "index.html";
        }
    });
}