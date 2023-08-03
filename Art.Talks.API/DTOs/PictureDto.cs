namespace Art.Talks.API.DTOs
{
    public class PictureDto
    {
        public int Id { get; set; }
        public string? ImageURL { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? ArtistName { get; set; }
    }
}
