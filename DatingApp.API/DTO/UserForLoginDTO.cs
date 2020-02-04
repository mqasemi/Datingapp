using System.ComponentModel.DataAnnotations;
namespace DatingApp.API.DTO
{
    public class UserForLoginDTO
    {
        [Required]
        [StringLength(50,MinimumLength=3)]
        public string Username { get; set; }
        [Required]
        [StringLength(50,MinimumLength=3)]
        public string Password { get; set; }    
    }
}