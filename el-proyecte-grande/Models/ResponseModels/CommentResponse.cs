using El_Proyecte_Grande.Models.Entities;

namespace El_Proyecte_Grande.Models.ResponseModels
{
    public class CommentResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public Exception Errors { get; set; }
        public List<Comment> Comments { get; set; }

    }
}
