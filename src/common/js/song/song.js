export default class Song {
  constructor ({name, mid, pic, singer, url = ''}) {
    this.mid = mid
    this.pic = pic
    this.name = name
    this.singer = singer
    this.url = url
  }
}
