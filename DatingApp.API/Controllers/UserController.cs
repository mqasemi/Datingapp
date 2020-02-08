using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDatingRepository _repo;

        public UserController(IDatingRepository repo)
        {
            this._repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> Users()
        {
            var user=await _repo.GetUsers();
            return Ok(user);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getUser(int id)
        {
            var user=await _repo.GetUser(id);
            return Ok(user);
        }
    }
}