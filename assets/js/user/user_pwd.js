$(function () {
    //为密码定义校验规则   且不能和旧密码相同
    var form = layui.form
    form.verify({
        //正则表达式，不匹配返回的提示信息
        pwd: [/^[\S]{6,12}$/, '密码必须6-12为企鹅不能出现空格'],
        pwd1: function (value) {
            if (value === $('[name=newPwd]').valueOf()) {
                return '新旧密码不能相同'
            }

        },
        pwd2: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一样'
            }
        }
    })












    $('#formpwd').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！请重新登录')
                // 重置表单
                setTimeout(function () {
                    $("#formpwd")[0].reset()
                    localStorage.removeItem('token')
                    window.parent.location.href = '/login.html'
                }, 3000)


            },

        })



    })









})