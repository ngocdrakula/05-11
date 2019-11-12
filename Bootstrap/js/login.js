const formLogin = `
<div class="login">
    <div class="title">
        Login to TechKids
    </div>
    <form action="/" method="POST" id="login">
            <div class="input">
                <span>Username:</span>
                <input type="text" name="username" id="username" required="true" placeholder="Email hoặc username" value="Admintranstor">
            </div>
            <div class="input">
                <span>Password:</span>
                <input type="password" name="password" id="password" required="true"placeholder="Mật khẩu của bạn" value="11111111" autofocus="1">
            </div>
            <div class="remember">
                <input type="checkbox" name="remember" id="remember">
                <label for="remember"><span>Remember login</span></label>
            </div>
            <div class="displaynone" id="response"></div>
            <div class="submit">
                <input type="submit" value="Submit">
            </div>
            <div class="moveForm" id="changeForm"><a href="#" title="Register new account now">Don't have an account?</div>
        </form>
    </div>
    `;

function showLogin(){
    document.getElementById("userForm").innerHTML = formLogin;
    document.getElementById("login").addEventListener("submit", function(e){
        e.preventDefault();
        var data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            remember: document.getElementById("remember").checked
        };
        fetch('api/auth/signin',{
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
                    document.getElementById("userForm").innerHTML = `<h1>Hello ${result.data.username}!</h1>`;
                    console.log(result);
                }
            })
            .catch(errors => {
                console.log(errors);
            }
            )
        })
        .catch(err => {
            console.log(err);
        })
    }
    )
}
const login = {
    showLogin,
    formLogin
}
export default login;