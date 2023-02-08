using El_Proyecte_Grande.Models;
using El_Proyecte_Grande.Models.Data;
using El_Proyecte_Grande.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Runtime.CompilerServices;

namespace El_Proyecte_Grande.Services
{
    public class UserService
    {

        private UserManager<IdentityUser> _userManager;


        public UserService(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }


        public async Task<Response> GetAllUsers()
        {
            return new Response
            {
                IdentityUsers = await _userManager.Users.ToListAsync(),
                IsSuccess = true,
                Message = " This is the list of users "
            };
        }


        public async Task<Response> AddUser(User user)
        {
            IdentityUser identityUserSameEmail = await _userManager?.FindByEmailAsync(user.Email);
            IdentityUser identityUserSameUsername = await _userManager?.FindByNameAsync(user.Username);

            if (identityUserSameEmail != null)
            {
                return new Response
                {
                    IsSuccess= false,
                    Message = "there is already an user with the same email"
                };
            }

            else if (identityUserSameUsername != null)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = "there is already an user with the same username "
                };
            }


            IdentityUser identityUser = new IdentityUser
            {
                Email = user.Email,
                UserName = user.Username
            };
            IdentityResult result = await _userManager.CreateAsync(identityUser, user.Passowrd);

            if (result.Succeeded)
            {
                return new Response
                {
                    IsSuccess = true,
                    Message = "successfuly added an user"
                };
            }
            return new Response
            {
                IsSuccess = false,
                Message = "could not add user",
                Errors = (IEnumerable<string>)result.Errors.ToList()
            };
            

        }



        public async Task<Response> DeleteUser(string id)
        {
            var result = await _userManager.DeleteAsync(await _userManager?.FindByIdAsync(id));
            if (result.Succeeded)
            {
                return new Response { IsSuccess = true, Message = "you have successfully deleted an user" } ;
            }
            return new Response { IsSuccess = false, Message = "there is no user with this ID"  , Errors = (IEnumerable<string>)result.Errors.ToList() };

        }




        public async Task<Response> DeleteAllUsers()
        {
            var result = await _userManager.Users.ExecuteDeleteAsync();
            if (result > 0)
            {
                return new Response { IsSuccess = true, Message = $"you have deleted {result} number of users" };
            }

            return new Response { IsSuccess = false, Message = "no users to delete"};
        }




        public async Task<Response> GetUserByID(string id)
        {
            var user= await _userManager.FindByIdAsync(id);
            if(user is null)
            {
                return new Response { IsSuccess = false, Message = "there is no user with that ID" };
            }
            return new Response { IsSuccess = true, Message = $"The user is {user.UserName}" , IdentityUsers = new List<IdentityUser>{user} };

        }




        public async Task<Response> UpdateUser(User user, string id)
        {
            var result = await GetUserByID(id);
            if (!result.IsSuccess)
            {
                return new Response { IsSuccess = false, Message = "there is no such user" };
            }

            IdentityUser identityUser = result.IdentityUsers.First();
            identityUser.Email = user.Email;
            identityUser.UserName = user.Username;
            var afterUpdateResult = await _userManager.UpdateAsync(identityUser);

            if (!afterUpdateResult.Succeeded)
            {
                return new Response { IsSuccess = false, Message = "could not update the user" , Errors = (IEnumerable<string>)result.Errors.ToList() };
            }
            return new Response { IsSuccess = true, Message = $"The user {identityUser.UserName} is updated ", IdentityUsers = new List<IdentityUser> { identityUser } };

        }



        public async Task<Response> Login(User user)
        {
            IdentityUser identityUser = await _userManager.FindByNameAsync(user.Username);

            if (identityUser == null)
            {
                return new Response { IsSuccess = false, Message = "could not find an user with such a username" };

            }

            if (!await _userManager.CheckPasswordAsync(identityUser, user.Passowrd))
            {
                return new Response { IsSuccess = false, Message = "could not find an user with such a password" };

            }
            return new Response { IsSuccess = true, Message = $"The user {identityUser.UserName} is logged in", IdentityUsers = new List<IdentityUser> { identityUser } };
        }



    }
}
