function SmartBook(service) {
    this.service = service

    this.echo = (bookname) => {
        var n = 'xxx'
        var cover = this.service(bookname)
        return `This book is ${cover}`
    }
}

function AmazonService(authService) {
    this.authService = authService

    this.detail = (title, ISBN ,image) => {
        var obj = this.authService(title, ISBN ,image)
        return {
            title: obj.title,
            token: '000000000'
        }
    }
}

test('Search book name', () => {
    const mockFn = jest.fn()
        .mockReturnValue('Photoshop')

    var app = new SmartBook(mockFn)
    var bookname = 'Photo'
    var result = app.echo(bookname)

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledWith(bookname)
    expect(result).toBe('This book is Photoshop')
})

test('detail book', () => {
    const DetailBookAuthMock = jest.fn()
        .mockReturnValue({
            title: 'Photoshop',
          ISBN: '524877139',
            image: 'PhotoSun.jpg'
        })

    var auth = new AmazonService(DetailBookAuthMock)

    var title = 'Photoshop'
    var ISBN ='524877139'
    var  image= 'PhotoSun.jpg'
    var accountInfo = auth.detail(title, ISBN ,image)

    expect(DetailBookAuthMock).toHaveBeenCalled()
    expect(DetailBookAuthMock).toHaveBeenCalledWith(title, ISBN ,image)
    expect(accountInfo.title).toBe('Photoshop')
    expect(accountInfo).toHaveProperty('token')
    expect(accountInfo.token).toHaveLength(9)
})
