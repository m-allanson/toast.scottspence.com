import * as PostSource from './data/fetch-mdx-posts.js'

export const sourceData = async ({ setDataForSlug }) => {
  const postsData = await PostSource.sourceData('./content/posts/', {
    setDataForSlug,
  })

  postsData.sort((b, a) => {
    const da = new Date(a.date).getTime()
    const db = new Date(b.date).getTime()
    if (da < db) return -1
    if (da === db) return 0
    if (da > db) return 1
  })

  await setDataForSlug('/writing', { data: { posts: postsData } })

  const copyData = await PostSource.sourceData('./content/copy/', {
    setDataForSlug,
  })

  await setDataForSlug('/', { data: { posts: copyData } })

  return
}
