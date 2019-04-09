export default class Song {
  constructor ({name, mid, pic, singer, int, url = null}) {
    name = name.replace('�', '')
    this.mid = mid
    this.pic = pic
    this.name = name
    this.singer = singer
    this.url = url
    this.int = int
  }
}
