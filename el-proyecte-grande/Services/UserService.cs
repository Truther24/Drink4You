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


        public async Task AddUser(User user)
        {
            await _context.CreateUser(user);
        }


        public async Task DeleteUser(Guid id)
        {
            await _context.DeleteUserByID(id);
        }


    }
}
