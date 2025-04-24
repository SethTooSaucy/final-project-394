using backend.DTOs;
using backend.Entities;
using backend.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Endpoints;

public static class StudentEndpoints
{
    public static void Map(WebApplication app)
    {
        /// Get all students
        app.MapGet(
            "/students",
            async ([FromServices] PostgresDbContext context) =>
            {
                return await context
                    .Student.Select(student => new GetStudentDto(student))
                    .ToListAsync();
            }
        );

        /// Get a specific student by id
        app.MapGet(
            "/student/{id}",
            async ([FromServices] PostgresDbContext context, [FromRoute] Guid id) =>
            {
                var student = await context.Student.FindAsync(id);

                if (student == null)
                {
                    return Results.NotFound();
                }

                return Results.Ok(new GetStudentDto(student));
            }
        );

        /// Upsert a student
        app.MapPost(
            "/student",
            async (
                [FromServices] PostgresDbContext context,
                [FromBody] UpsertStudentDto upsertDto
            ) =>
            {
                Student? student = null;

                if (upsertDto.Id.HasValue)
                {
                    student = await context.Student.FindAsync(upsertDto.Id);

                    if (student == null)
                    {
                        return Results.NotFound();
                    }

                    student.Name = upsertDto.Name;
                    student.Classification = upsertDto.Classification;
                }
                else
                {
                    student = new Student(upsertDto.Name, upsertDto.Classification);

                    await context.Student.AddAsync(student);
                }

                await context.SaveChangesAsync();
                return Results.Ok(new GetStudentDto(student));
            }
        );

        /// Delete a student by id
        app.MapDelete(
            "/student/{id}",
            async ([FromServices] PostgresDbContext context, [FromRoute] Guid id) =>
            {
                var student = await context.Student.FindAsync(id);

                if (student == null)
                {
                    return Results.NotFound();
                }

                context.Student.Remove(student);
                await context.SaveChangesAsync();

                return Results.Ok();
            }
        );

        /// Update a student's classification
        app.MapPut(
            "/student/{id}/{classification}",
            async (
                [FromServices] PostgresDbContext context,
                [FromRoute] Guid id,
                [FromRoute] StudentClassification classification
            ) =>
            {
                var student = await context.Student.FindAsync(id);

                if (student == null)
                {
                    return Results.NotFound();
                }

                student.Classification = classification;
                await context.SaveChangesAsync();

                return Results.Ok(new GetStudentDto(student));
            }
        );
    }
}
