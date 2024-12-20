from instagram.instagram import download_using_instaloader
from twitter.twitter import download_tweet_media

def download_from_url(url):
    url = url[0:url.find('?')] if '?' in url else url
    shortcode = ""
    if url.find('instagram.com') >= 0:
        # type = 'instagram'
        if not url.endswith('/'):
            shortcode = url.split("/")[-1]
        else:
            shortcode = url.split("/")[-2]

        # print("here")
        result = download_using_instaloader(shortcode)
        print(result)
        if result["status"] == True:
            return {"message": result["message"]}
        else:
            return {"error": result["error"]}


    elif url.find('x.com') >= 0:
        # type = 'x'
        if not url.endswith('/'):
            shortcode = url.split("/")[-1]
        else:
            shortcode = url.split("/")[-2]

        result = download_tweet_media(url, shortcode)
        # print(result)
        if result["status"] == True:
            return {"message": result["message"] }
        else:
            return {"error": result["error"]}