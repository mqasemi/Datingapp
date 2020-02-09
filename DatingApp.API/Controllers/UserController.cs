using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
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
        private readonly IMapper _mapper;

        public UserController(IDatingRepository repo, IMapper mapper)
        {
            this._mapper = mapper;
            this._repo = repo;

        }
        [HttpGet]
        public async Task<IActionResult> Users()
        {
            var user = await _repo.GetUsers();
            var usersForReturn= _mapper.Map<IEnumerable<UserForDetailsDTO>>(user);
            return Ok(usersForReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> getUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userForReturn = _mapper.Map<UserForDetailsDTO>(user);
            return Ok(userForReturn);
        }
    }
}