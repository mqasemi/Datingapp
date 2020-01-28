using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.DTO
{
    public class UserForRegisterDTO
    {
        [Required]
        [StringLength(50,MinimumLength=3)]
        public string Username { get; set; }    
        public string  Password { get; set; }
    }
}