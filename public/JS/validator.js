// Đối tượng validator
function Validator(options) {

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        inputElement.onblur = function () {
            const errorMessage = rule.test(inputElement.value);
            const errorElement = inputElement.parentElement.querySelector('.form-message');
            if (errorMessage) {
                errorElement.innerText = errorMessage
                inputElement.parentElement.classList.add('invalid')
                inputElement.classList.add('invalid')
            } else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid')
                inputElement.classList.remove('invalid')
            }
        }
    }


    // Lấy element của form cần validate
    const formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {

                // xử lí trường hợp blur ra khỏi input
                validate(inputElement, rule)

                // xử lí mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    const errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                    inputElement.classList.remove('invalid')
                }
            }
        });
    }
}


// Định nghĩa các rules 
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Ko trả ra gì cả cái gì (undefined) 
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.isPassword = function (selector, message) {
    return {
        selector: selector,
        test: function () {
            const regex = /^.{6,}$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là password'
        }
    }
}

Validator.isConfirmPassword = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message ||  `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}