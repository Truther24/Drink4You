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

        //public async Task<List<User>> GetAllUsers()
        //{
        //    return await _context.GetAllUsers();
        //}


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

        //public async Task<bool> AddUser(User user)
        //{

        //    return await _context.CreateUser(user);
        //}



        public async Task DeleteUser(string id)
        {
            await _userManager.DeleteAsync(await _userManager?.FindByIdAsync(id));
        }


        //public async Task DeleteUser(Guid id)
        //{
        //    await _context.DeleteUserByID(id);
        //}


        public async Task DeleteAllUsers()
        {
            await _userManager.Users.ForEachAsync(user => _userManager.DeleteAsync(user));
        }



        //public async Task DeleteAllUsers()
        //{
        //    await _context.DeleteAllUsers();
        //}



        public async Task<User> GetUserByID(Guid id)
        {
            return await _context.GetUserByID(id);
        }


        public async Task UpdateUser(User user)
        {
            await _context.UpdateUser(user);
        }

        public async Task<User> Login(User user)
        {
            return await _context.Login(user);
        }
    }
}
