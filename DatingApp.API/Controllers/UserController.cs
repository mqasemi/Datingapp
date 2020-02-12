using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id,UserForUpdateDto userforUpdateDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
            var userforUpdate= await _repo.GetUser(id);
            _mapper.Map(userforUpdateDto,userforUpdate);
            if(await _repo.SaveAll())
            return NoContent();
            throw new Exception($"updating user {id} faild");

        }
    }
}