using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Data;
using Newtonsoft.Json;

namespace DatingApp.API.Models
{
    public class Seed
    {
        public static void SeedUser(DataContext dataContext)
        {
            if(!dataContext.Users.Any()){
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users=JsonConvert.DeserializeObject<List<User>>(userData);
                foreach (var user in users)
                {
                    byte[]passwordHash,passwordSalt;
                    createPasswordHash("123",out passwordHash,out passwordSalt);
                    user.passwordHash=passwordHash;
                    user.PasswordSalt=passwordSalt;
                    user.Username=user.Username.ToLower();
                    dataContext.Users.Add(user);
                   

                    
                }                
                dataContext.SaveChanges();
            }
        }
         private static void createPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}