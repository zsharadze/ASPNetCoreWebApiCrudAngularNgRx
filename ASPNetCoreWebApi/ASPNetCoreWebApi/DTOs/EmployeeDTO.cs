using System.ComponentModel.DataAnnotations;

namespace ASPNetCoreWebApi.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
