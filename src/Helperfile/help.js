
function otp()
{
    let digits = '0123456789';
let OTP = '';
for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
}
return OTP;
}

function structure(data, message, status) {
    return { status, message, data }
}




 
module.exports={
    
    otp,
    structure
}