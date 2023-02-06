using El_Proyecte_Grande.Models.Data;
using El_Proyecte_Grande.Models.Entities;

namespace El_Proyecte_Grande.Services
{
    public class UserService
    {
        private readonly DrinkContext _context;


        public UserService(DrinkContext drinkContext)
        {
            _context= drinkContext;
        }


        public async Task<List<User>> GetAllUsers()
        {
            return await _context.GetAllUsers();
        }


        public async Task<bool> AddUser(User user)
        {
            
           return await _context.CreateUser(user);
        }


        public async Task DeleteUser(Guid id)
        {
            await _context.DeleteUserByID(id);
        }


        public async Task DeleteAllUsers()
        {
            await _context.DeleteAllUsers();
        }



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
