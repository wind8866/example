// 浏览器控制台，通过豆列获取数据
// https://www.douban.com/doulist/118525093/
function douListData(name) {
  const douListDataMap = {}
  document.querySelectorAll('.doulist-item').forEach((node) => {
    const titleDOM = node.querySelector('div.title')
    const title = titleDOM.innerText.trim().split(' ')[0]
    const href = titleDOM.querySelector('a').href
    const reg = /https:\/\/movie.douban.com\/subject\/(\d+)\//
    const doubanId = reg.exec(href)?.[1]
    const abstract = node.querySelector('.abstract')
    const y = abstract.innerText
    const reg2 = /年份: (\d{4})/
    const year = reg2.exec(y)?.[1]

    douListDataMap[title] = {
      id: doubanId,
      year,
    }
  })
  JSON.stringify(douListDataMap)
  // const douListDataMapFake = {
  //   菊次郎的夏天: { id: '1293359', year: '1999' },
  // }
  return douListDataMap
}

// 浏览器控制台，获取数据
// https://movie.douban.com/subject/3205445/
const href = document.URL
const reg = /https:\/\/movie.douban.com\/subject\/(\d+)\//
const id = reg.exec(href)?.[1]
const score = Number(
  document.querySelector('[property="v:average"]')?.innerText ?? 0,
)
const commentCount = Number(
  document.querySelector('[property="v:votes"]')?.innerText ?? 0,
)
const year = document
  .querySelector('h1 .year')
  ?.innerText.replaceAll(/[()]/g, '')
const poster = document
  .querySelector('[rel="v:image"]')
  .src?.replace('s_ratio_poster', 'row')
const name =
  document.querySelector('[property="v:itemreviewed"]')?.innerText ?? ''
const obj = {
  id: Number(id),
  name,
  score,
  commentCount,
  year: Number(year),
  poster,
}
console.log(JSON.stringify(obj))
copy(JSON.stringify(obj))
