interface Chart {
  id: string,
  title: string,
  content: string,
  image_url: string,
  image_source: string,
  created_at: string,
  updated_at: string,
  published_at: string,
  isPublished: boolean,
  blogId: string,
  userId: string,
}

export default Chart;