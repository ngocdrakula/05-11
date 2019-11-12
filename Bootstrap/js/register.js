const formRegister = `
<div class="register">
    <div class="title">
        Register to TechKids
    </div>
    <form action="/" method="POST" id="register">
            <div class="input">
                <span>Your name:</span>
                <input type="text" name="name" id="name" required="true" placeholder="What your name?" value="Ngọc">
            </div>
            <div class="input">
                <span>Email:</span>
                <input type="email" name="email" id="email" required="true" placeholder=" What your email?" value="ngocdrakula@gmail.com">
            </div>
            <div class="input">
                <span>Username:</span>
                <input type="text" name="username" id="username" required="true" placeholder="Login username" value="Ngocdrakula">
            </div>
            <div class="input">
                <span>Password:</span>
                <input type="password" name="password" id="password" required="true"placeholder="Your password" value="11111111">
            </div>
            <div class="input">
                <span>Confirm password:</span>
                <input type="password" name="repassword" id="repassword" required="true"placeholder="Enter your password" value="11111111" autofocus="1">
            </div>
            <div class="terms" id="confirm">
                <input type="checkbox" name="terms" id="terms">
                <label for="terms"><span>I agree with <a href="#" id="confirm1">the terms</a></span></label>
                <div class="displaynone" id="termsString"></div>
            </div>
            <div class="displaynone" id="response"></div>
            <div class="submit">
                <input type="submit" value="Submit">
            </div>
            <div class="moveForm" id="changeForm"><a href="#" title="Login to TechKids">Do you already have an account?</div>
        </form>
    </div>
    `;

function showRegister(){
    document.getElementById("userForm").innerHTML = formRegister;
    document.getElementById("register").addEventListener("submit", function(e){
        e.preventDefault();
        var data = {
            username: document.getElementById("username").value,
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            repassword: document.getElementById("repassword").value,
            terms: document.getElementById("terms").checked
        };
        if(data.password == data.repassword && data.terms){
            fetch('api/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                res.json().then(result => {
                    if(result.success == false){
                        document.getElementById("response").classList = "response";
                        document.getElementById("response").innerHTML = `
                            <span>* ${result.err}</span>
                        `;
                    }
                    else{
                        document.getElementById("userForm").innerHTML = "<h1>Chúc mừng bạn đăng kí thành công!</h1>";
                        console.log(result.data);
                }
                })
                .catch(errors => {
                    console.log(errors);
                }
                )
            })
            .catch(err => {
                console.log(err);
            });
        }
        else{
            var errString = "";
            if(data.password != data.repassword){
                errString = "Confirm password does not match!";
            }
            else{
                errString = "You must agree to the terms!";
            }
                document.getElementById("response").classList = "response";
                document.getElementById("response").innerHTML = `
                    <span>${errString}</span>
                    `;

        }
    }
    );
    document.getElementById("confirm").addEventListener("mousemove", function(e){
        var terms = document.getElementById("termsString");
        terms.classList = "confirm";
        terms.setAttribute("style",`position: fixed; left: ${e.clientX + 5}px; top: ${e.clientY + 5}px; ${document.getElementById("terms").checked == true ? "color: red":""}`);
        terms.innerHTML =
            `<p>Đồng ý với điều khoản là bạn đã chấp nhận giao toàn bộ thông tin của mình cho TechKids.</p>
            <p>TechKids có quyền sử dụng tất cả thông tin bạn đã cung cấp ở nơi khác mà không cần hỏi ý kiến của bạn.</p>`;
    });
    document.getElementById("confirm").addEventListener("mouseout", function(e){
        var terms = document.getElementById("termsString");
        terms.classList = "displaynone";
        terms.innerHTML = "";
    });
}
const register = {
    showRegister,
    formRegister
}
export default register;