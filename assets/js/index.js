;

function render(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}
var layer = layui.layer
//点击退出登录
$('#tuichu').on('click', function () {
    layer.confirm('确定退出登录？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
})



a()

function a() {

    $.ajax({
        muthod: 'GET',
        url: '/my/userinfo',
        success: function (res) {

            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')

            render(res.data)
        },


    })
};