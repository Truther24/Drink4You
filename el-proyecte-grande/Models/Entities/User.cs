using System.ComponentModel.DataAnnotations.Schema;

namespace El_Proyecte_Grande.Models.Entities
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public string Passowrd { get; set; }


    }
}
