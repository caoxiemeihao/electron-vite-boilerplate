
export const extensions = ['.js', '.jsx', '.ts', '.tsx', '.vue']

export function cleanUrl(url: string) {
  return url.replace(/(\?|#).*$/, '')
}
