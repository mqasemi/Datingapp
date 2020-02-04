using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }
        [HttpPost("register")]
        public async Task<IActionResult> register([FromBody] UserForRegisterDTO user)
        {

            if (await _repo.UserExists(user.Username.ToLower()))
                return BadRequest("user exist");
            var userToregister = new User() { Username = user.Username.ToLower() };
            var registeredUser = await _repo.Register(userToregister, user.Password);
            return StatusCode(201);
        }
        [HttpPost("Login")]
        public async Task<ActionResult> Login(UserForLoginDTO user)
        {
            throw new Exception("computer sy no!");
            var userFromRepo = await _repo.Login(user.Username.ToLower(), user.Password);
            if (userFromRepo == null)
                return Unauthorized();
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username),
                new Claim("test","test")

            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(
                new { token = tokenHandler.WriteToken(token) }
            );
        }
    }
}