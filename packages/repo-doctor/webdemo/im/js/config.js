(function() {
    // 配置
    var envir = 'online';
    var configMap = {
        test: {
            appkey: 'fe416640c8e8a72734219e1847ad2547',
            url:'https://apptest.netease.im'
        },
        pre:{
    		appkey: '45c6af3c98409b18a84451215d0bdd6e',
    		url:'http://preapp.netease.im:8184'
        },
        online: {
           appkey: 'a158bb1714a4933e2494b8a7d1c15b84',
           url:'https://app.netease.im'
        }
    };
    window.CONFIG = configMap[envir];
}())
