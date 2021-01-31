$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //点击上传选择文件
    $('#butsc').on('click', function () {
        $('#file').click()
    })
    //为选中文件绑定事件
    $('#file').on('change', function (e) {
        console.log(e);
        var filelist = e.target.files
        if (filelist.length === 0) return layui.layer.msg('请上传图片')
        //拿到用户选中的文件
        var file = e.target.files[0]

        // 将文件转化为路径
        var imgurl = URL.createObjectURL(file)
        // 冲新加载裁剪区域
        $image
            .cropper('destroy')
            .attr('src', imgurl)
            .cropper(options)
    })

    //绑定点击事件修改头像
    $('#btnupload').on('click', function () {
        //获取用户上传的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.status !== 0) return layui.layer.msg('更新图片失败请重新上传')
                layui.layer.msg('更新图片成功')
                window.parent.a()
            }

        })
    })
})