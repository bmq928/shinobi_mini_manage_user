$(document).ready(function () {

    var domain = 'http://localhost:3000/api/'

    function jsonfyErr(err) { return err.responseJSON }
    //login
    $('#login').on('submit', function (e) {
        e.preventDefault();
        var mail = $('#mail').val();
        var password = $('#password').val();

        $.ajax({
            url: domain + 'login',
            type: 'post',
            data: {
                mail: mail,
                password: password
            },
            success: function (data, status) {

                console.log(data);
                localStorage['jwt-token'] = data.token;
                $('#login-err').html('success');
            },
            error: function (err) {
                console.error(err.responseJSON)
                err = jsonfyErr(err)
                $('#login-err').html(err.message);
            }
        })
    })

    //logout
    $('#logout-btn').on('click', function (e) {
        e.preventDefault();
        if (localStorage.getItem('jwt-token')) localStorage.removeItem("jwt-token")
        $('#login-err').html('logout success');
    })

    //list all monitors of current user
    $('#show-monitors').on('click', function () {
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'getAllMonitors',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + token
            },
            success: function (data, status) {
                var mids = data.alMonitors;
                var $ul = $('#cur-user-list-monitor');
                mids.forEach(mid => {
                    $ul.append('<li>' + mid + '</li>');
                })
                $('#all-monitor-err').html('');
            },
            error: function (err) {
                err = jsonfyErr(err);
                $('#all-monitor-err').html(err.message);
            }
        })
    })

    //list all streams of current user
    $('#show-monitors-stream').on('click', function(){
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'getAllMonitorStreamByMail',
            type: 'get',
            headers: {
                Authorization: 'Bearer ' + token
            },
            success: function (data, status) {
                var mids = data.links;
                var $ul = $('#cur-user-list-monitor-stream');
                mids.forEach(link => {
                    $ul.append('<li><iframe src="' + link + '"></iframe></li>');
                })
                $('#all-monitor-err').html('');
            },
            error: function (err) {
                err = jsonfyErr(err);
                $('#all-monitor-stream-err').html(err.message);
            }
        })
    })

    //allocateMonitor
    $('#allocateMonitor').on('submit', function (e) {
        e.preventDefault();
        var uid = $('#allocateMonitor-uid').val()
        var mid = $('#allocateMonitor-mid').val()
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'allocate-monitor/',
            type: 'put',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                uid: uid,
                mid: mid
            },
            success: function (data, status) {
                console.log('post')
                console.log(data)
                $('#allocateMonitor-err').html(data.message);
            },
            error: function (err) {
                console.error(err)
                err = jsonfyErr(err)
                $('#allocateMonitor-err').html(err.message);
            }
        })

    })

    //unallocateMonitor
    $('#unallocateMonitor').on('submit', function (e) {
        e.preventDefault();
        var uid = $('#unallocateMonitor-uid').val()
        var mid = $('#unallocateMonitor-mid').val()
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'unallocate-monitor/',
            type: 'put',
            headers: {
                Authorization: 'Bearer ' + token
            }, data: {
                uid: uid,
                mid: mid
            },
            success: function (data, status) {
                console.log('post')
                console.log(data)
                $('#unallocateMonitor-err').html(data.message)
            },
            error: function (err) {
                console.error(err)
                err = jsonfyErr(err)
                $('#unallocateMonitor-err').html(err.message)
            }
        })

    })

    //adduser
    $('#adduser').on('submit', function (e) {
        e.preventDefault();

        var mail = $('#adduser-mail').val()
        var ke = $('#adduser-ke').val()
        var password = $('#adduser-pass').val()
        var detail = $('#adduser-detail').val()
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'addUser',
            type: 'post',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                mail: mail,
                password: password,
                ke: ke,
                detail: detail,
            },
            success: function (data, status) {
                console.log('post')
                console.log(data)
                $('#adduser-err').html(data.message)
            },
            error: function (err) {
                console.error(err)
                err = jsonfyErr(err)
                $('#adduser-err').html(err.message)
            }
        })


    })

    //removeUserByMail
    $('#removeUserByMail').on('submit', function (e) {
        e.preventDefault();

        var mail = $('#removeUserByMail-mail').val();
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'removeUserByMail',
            type: 'delete',
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                mail: mail
            },
            success: function (data, status) {
                console.log('post')
                console.log(data) // not show the data perhaps because of the default of delete method
                $('#removeUserByMail-err').html(data.message)
            },
            error: function (err) {
                console.error(err)
                err = jsonfyErr(err)
                $('#removeUserByMail-err').html(err.message)

            }
        })

    })

    $('#alMonitorByMail').on('submit', function (e) {
        e.preventDefault();

        var mail = $('#alMonitorByMail-mail').val()
        var token = localStorage.getItem('jwt-token')

        $.ajax({
            url: domain + 'alMonitorsByMail/?mail=' + mail,
            headers: {
                Authorization: 'Bearer ' + token
            },
            type: 'get',
            success: function (data, status) {
                var $ul = $('#alMonitorByMail-ul')
                var { alMonitors } = data

                alMonitors.forEach(m => {
                    $ul.append('<li>' + m + '</li>')
                })
                $('#alMonitorByMail-err').html('')
            },
            error: function(err){
                console.log(err)
                err = jsonfyErr(err)
                $('#alMonitorByMail-err').html(err.message)
            }
        })
    })

})
