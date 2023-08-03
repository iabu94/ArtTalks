using Art.Talks.API.DTOs;
using System.Text;

namespace Art.Talks.API.Extensions
{
    public static class GeneratePicture
    {
        public static PictureDto Generate(this PictureDto picture, int id)
        {
            picture.Id = id;
            picture.Title = $"Title {id}";
            picture.ArtistName = $"Artist {id}";
            picture.Description = LoremIpsum();
            picture.ImageURL = ImageUrl(id);
            return picture;
        }

        public static string LoremIpsum()
        {

            var words = new[]{"lorem", "ipsum", "dolor", "sit", "amet", "consectetuer",
        "adipiscing", "elit", "sed", "diam", "nonummy", "nibh", "euismod",
        "tincidunt", "ut", "laoreet", "dolore", "magna", "aliquam", "erat"};

            var rand = new Random();
            int numSentences = rand.Next(1 - 1) + 1 + 1;
            int numWords = rand.Next(12 - 10) + 10 + 1;

            StringBuilder result = new StringBuilder();

            for (int p = 0; p < 1; p++)
            {
                for (int s = 0; s < numSentences; s++)
                {
                    for (int w = 0; w < numWords; w++)
                    {
                        if (w > 0) { result.Append(" "); }
                        result.Append(words[rand.Next(words.Length)]);
                    }
                    result.Append(". ");
                }
            }

            return result.ToString();
        }

        public static string ImageUrl(int id)
        {
            var urls = new string[] {
                "https://shorturl.at/sSUX5",
                "https://shorturl.at/txIQW"
            };
            return urls[ id % 2];
        }
    }
}
