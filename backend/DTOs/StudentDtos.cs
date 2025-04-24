using backend.Entities;
using backend.Types;

namespace backend.DTOs;

public record GetStudentDto(Guid Id, string Name, StudentClassification Classification)
{
    public GetStudentDto(Student student)
        : this(student.Id, student.Name, student.Classification) { }
}

public record UpsertStudentDto(string Name, StudentClassification Classification, Guid? Id)
{
    public Guid? Id { get; init; } = Id;
    public string Name { get; init; } = Name;
    public StudentClassification Classification { get; init; } = Classification;
}
