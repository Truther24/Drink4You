﻿using Microsoft.AspNetCore.Identity;

namespace El_Proyecte_Grande.Models.ResponseModels
{
    public class Response
    {


        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public IEnumerable<IdentityError> Errors { get; set; }
        public List<IdentityUser> IdentityUsers { get; set; }

        public DateTime ExpireDate { get; set; }

    }
}
