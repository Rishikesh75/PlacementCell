using Microsoft.EntityFrameworkCore;
using PlacementCellBackend.Data;
using PlacementCellBackend.Models;
using PlacementCellBackend.Services.CRUD.Interfaces;

namespace PlacementCellBackend.Services.CRUD
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetAllStudentsAsync()
        {
            return await _context.student.ToListAsync();
        }

        public async Task<Student?> GetStudentByIdAsync(string id)
        {
            return await _context.student.FindAsync(id);
        }

        public async Task<Student> CreateStudentAsync(Student student)
        {
            _context.student.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<bool> UpDateStudentAsync(string id, Student student)
        {
            var existingStudent = await _context.student.FindAsync(id);
            if (existingStudent == null)
                return false;

            existingStudent.Name = student.Name;
            existingStudent.Major = student.Major;
            existingStudent.Email = student.Email;
            existingStudent.GraduationYear = student.GraduationYear;
            existingStudent.PhoneNo = student.PhoneNo;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteStudentAsync(string id)
        {
            var student = await _context.student.FindAsync(id);
            if (student == null)
                return false;

            _context.student.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

