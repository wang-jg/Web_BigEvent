$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })


    //获取用户信息
    getuser()

    function getuser() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            heads: {},
            success(res) {
                if (res.status !== 0) return layui.layer.msg(res.message)

                form.val('formuser', res.data)
            }
        })
    }
    //点击重置按钮
    $('#btnset').on('click', function (e) {
        e.preventDefault()
        getuser()
    })
    //点击提交按钮
    $('#formus').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户信息失败')

                }
                layer.msg('更新用户信息成功')
                window.parent.a()
            }
        })
    })
})