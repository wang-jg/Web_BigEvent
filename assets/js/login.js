$(function () {
    //点击‘去注册账号的链接’
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //获取layui里面的form
    var form = layui.form

    var layer = layui.layer
    //获取layui下的layui
    form.verify({
        PWD: [/^[\S]{6,18}$/, '密码不能带空格且需要6-18位'],
        //添加注册密码的规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()

        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {

                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link_login').click()

        })
    })
    //监听登录表单验证发起登录请求
    $('#form_login').submit(function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        console.log(typeof data);

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data,
            success(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})