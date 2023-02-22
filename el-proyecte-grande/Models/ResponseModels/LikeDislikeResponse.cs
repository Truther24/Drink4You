using El_Proyecte_Grande.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace El_Proyecte_Grande.Models.ResponseModels
{
    public class LikeDislikeResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public Exception Errors { get; set; }
        public List<DrinkDatabase> DrinksDatabase { get; set; }

        public DateTime ExpireDate { get; set; }
    }
}
