using Art.Talks.API.DTOs;
using Art.Talks.API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace Art.Talks.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly IList<PictureDto> _pictureList;

        public GalleryController()
        {
            this._pictureList = new List<PictureDto>()
            {
                new PictureDto().Generate(1),
                new PictureDto().Generate(2),
                new PictureDto().Generate(3),
                new PictureDto().Generate(4),
                new PictureDto().Generate(5),
                new PictureDto().Generate(6),
                new PictureDto().Generate(7),
                new PictureDto().Generate(8),
                new PictureDto().Generate(9),
                new PictureDto().Generate(10),
            };
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(this._pictureList);
        }
    }
}
