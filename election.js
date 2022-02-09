function abc(sdName){
    $.ajax({
        type:'GET',
        url:`http://lee0230.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=Jh50e5bCL8GT1aYPy9dFKhEmSTmFAhdkYAApVjLMmgxbtmbR65sHFFAb6YrBB7o9mtTRFgUqaU1%2BaleDw93R5Q%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforeSend:function(){
            $('#content').append('<div class="loading"><i calss="fa-solid fa-spinner"></i>로딩중입니다.</div>')
        },
        complete:function(){
            $('#content .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText) 
        }
        
    })
}
abc('서울특별시')

function usedata(data){
    $('#content .placeList').remove()
    var elem = `<ul class="placeList">`
    $(data).find('item').each(function(){
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<p>${placeName}</p>`
        elem += `<p>${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}

$('#content .tabTit li').on('click', function(){
    var cityName = $(this).text()
    abc(cityName)
})