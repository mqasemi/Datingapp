using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }
        [HttpPost("register")]
        async Task<IActionResult> register([FromBody] string username,[FromBody] string password)
        {
            if(await _repo.UserExists(username))
                return BadRequest("user exist");
            var userToregister=new User(){Username=username};
            var registeredUser= await _repo.Register(userToregister,password);
            return StatusCode(201);
        }
    }
}