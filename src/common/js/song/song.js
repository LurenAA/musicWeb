export default class Song {
  constructor ({name, mid, pic, singer, int, url = null}) {
    this.mid = mid
    this.pic = pic
    this.name = name
    this.singer = singer
    this.url = url
    this.int = int
  }
}
