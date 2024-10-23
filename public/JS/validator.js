// Đối tượng validator
function Validator(options) {

    const selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {

        let errorMessage = rule.test(inputElement.value);
        const errorElement = inputElement.parentElement.querySelector('.form-message');

        // Lấy ra các rules của selector 
        const rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm tra

        for (let index = 0; index < rules.length; index++) {
            errorMessage = rules[index](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
            inputElement.classList.add('invalid')
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
            inputElement.classList.remove('invalid')
        }
        return !errorMessage;
    }


    // Lấy element của form cần validate
    const formElement = document.querySelector(options.form)

    if (formElement) {
        formElement.onsubmit = function (e) {
            // e.preventDefault();
            let isFormValid = true;


            // Lặp qua từng rules và validate hết luôn 
            options.rules.forEach(rule => {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule)
                console.log(isValid);
                if (!isValid) {
                    isFormValid = false;
                }
            })
    
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {

                
                    options.onSubmit({

                    })
                }
            }


        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input,...)
        options.rules.forEach(rule => {
            const inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {

                // Lưu lại các rules cho mỗi input
                if (Array.isArray(selectorRules[rule.selector])) {
                    selectorRules[rule.selector].push(rule.test)
                } else {
                    selectorRules[rule.selector] = [rule.test];
                }

                // xử lí trường hợp blur ra khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

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
        test: function (value) {
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

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}