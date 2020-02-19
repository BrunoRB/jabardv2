
defmodule CrawlHN do
    HTTPoison.start

    baseUrl = "https://hacker-news.firebaseio.com/v0";

    url = baseUrl <> "/topstories.json"

    case HTTPoison.get(url) do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
            {:ok, data} = Jason.decode(body)

            # IO.inspect data

            for storyId <- data do
                storyUrl = "#{baseUrl}/item/#{storyId}.json"

                {:ok, %HTTPoison.Response{status_code: 200, body: sBody}} = HTTPoison.get(storyUrl)
                {:ok, sData} = Jason.decode(sBody)



                IO.inspect(sData)

                System.stop(0)
            end

        {:ok, %HTTPoison.Response{status_code: 404}} ->
            IO.puts "Not found :("
        {:error, %HTTPoison.Error{reason: reason}} ->
            IO.inspect reason
    end



    # IO.puts("DONE")

end
