using El_Proyecte_Grande.Models.Data;
using El_Proyecte_Grande.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace El_Proyecte_Grande.Services
{
    public class UserService
    {
        private readonly DrinkContext _context;

        private UserManager<IdentityUser> _userManager;

        public UserService(DrinkContext drinkContext , UserManager<IdentityUser> userManager)
        {
            _context= drinkContext;
            _userManager = userManager;
        }


        public async Task<List<IdentityUser>> GetAllUsers()
        {
            return await _userManager.Users.ToListAsync();
        }


        public async Task<bool> AddUser(User user)
        {
            IdentityUser identityUser = new IdentityUser
            {
                Email = user.Email,
                UserName = user.Username
            };
            IdentityResult result =  await _userManager.CreateAsync(identityUser,user.Passowrd);

            if (result.Succeeded)
            {
                return true;
            }
            return false;


        }



        public async Task DeleteUser(string id)
        {
            await _userManager.DeleteAsync(await _userManager?.FindByIdAsync(id));
        }




        public async Task DeleteAllUsers()
        {
            await _userManager.Users.ExecuteDeleteAsync();
        }




        public async Task<IdentityUser> GetUserByID(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }



        
        public async Task UpdateUser(User user,string id)
        {
            IdentityUser identityUser = await GetUserByID(id);

            identityUser.Email = user.Email;
            identityUser.UserName = user.Username;

            await _userManager.UpdateAsync(identityUser);
        }



        public async Task<IdentityUser> Login(User user)
        {
           IdentityUser identityUser = await _userManager.FindByNameAsync(user.Username);

            if (identityUser == null) 
            {
                return null;
            }

            if(! await _userManager.CheckPasswordAsync(identityUser, user.Passowrd))
            {
                return null;
            }
                return identityUser;
        }


        
    }
}
